class Api::ConversationsController < Api::BaseController
	before_action :set_enrolled_course
	before_action :set_course_service, only: [:create, :add_members]

	def index
		@group_conversations = @course.conversations.groups.collect { |conversation|  serialize_conversation(conversation) }
		@individual_conversations = current_user.conversations.individuals.collect { |conversation| serialize_conversation(conversation) }
		@course_details = serialize(@course, {serializer: CourseSerializer, fields: [:title, :message_link], include: ['enrolled_users']})
		@user_details = serialize(current_user, {serializer: UserSerializer, include: %w[user_message_notifications, enrolled_courses]})
		render json: {
				course_details: @course_details,
				group_conversations: @group_conversations,
				individual_conversations: @individual_conversations,
				user_details: @user_details,
		}
	end

	def messages
		@conversation = find_conversation
		render_conversation
	end

	def create
		other_user = @course.enrolled_users.find(message_params[:other_user_id])
		@conversation = @course_service.find_or_create_one_on_one_conversation(current_user, other_user)
		render_conversation
	end

	def create_group
		@conversation = @course.conversations.new(title: params[:title], is_group: true)
		if @conversation.save
			@conversation.conversation_enrolled_users.create(user_id: current_user.id)
			render_conversation
		else
			render json: {errors: @conversation.errors}
		end
	end

	def update_members
		@conversation = @course.conversations.groups.find(params[:conversation_id])
		@conversation.update_members(params[:user_ids])
		serialized_data = serialized_hash(@conversation, ConversationSerializer)
		ActionCable.server.broadcast 'conversations_channel', serialized_data
		render_conversation
	end

	private

	def serialize_conversation(conversation)
		serialize(conversation, {serializer: ConversationSerializer, include: ['conversation_enrolled_users']})
	end

	def find_conversation
		conversation = @course.conversations.groups.find_by(id: params[:conversation_id])
		return conversation if conversation.present?
		current_user.conversations.individuals.find_by(id: params[:conversation_id])
	end

	def render_conversation
		if @conversation
			render json: @conversation, include: %w[conversation_enrolled_users messages messages.sender]
		end
	end

	def set_course_service
		@course_service = CourseService.new(@course)
	end

	def message_params
		params.permit(:other_user_id)
	end
end
