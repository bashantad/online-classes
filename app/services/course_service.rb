class CourseService
	def initialize(course)
		@course = course
	end

	def find_or_create_one_on_one_conversation(first_user, second_user)
		if second_user == first_user
			conversation = _find_conversation_with_yourself(first_user)
		else
			conversation = _find_conversation_with_peer(first_user, second_user)
		end

		unless conversation.present?
			conversation = _create_personal_conversation(first_user, second_user)
		end
		conversation
	end

	def add_members(user_ids)
		@course.enrolled_users.where(:id => user_ids).each do |user|
			@course.conversation_enrolled_users.create(user_id: user.id)
		end
	end

	def _find_conversation_with_yourself(first_user)
		first_user.conversations.individuals.detect do |user_conversation|
			user_conversation.conversation_enrolled_users.count == 1
		end
	end

	def _find_conversation_with_peer(first_user, second_user)
		first_user.conversations.individuals.detect do |user_conversation|
			conversation_enrolled_users = user_conversation.conversation_enrolled_users
			conversation_enrolled_users.count == 2 && conversation_enrolled_users.find_by(user_id: second_user.id)
		end
	end

	def _create_personal_conversation(first_user, second_user)
		conversation = @course.conversations.create
		conversation.conversation_enrolled_users.create(:user_id => first_user.id)
		conversation.conversation_enrolled_users.create(:user_id => second_user.id) unless first_user == second_user
		conversation
	end
end
