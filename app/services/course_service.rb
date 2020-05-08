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

	def _find_conversation_with_yourself(first_user)
		first_user.conversations.individuals.detect do |user_conversation|
			user_conversation.conversation_users.count == 1
		end
	end

	def _find_conversation_with_peer(first_user, second_user)
		first_user.conversations.individuals.detect do |user_conversation|
			conversation_users = user_conversation.conversation_users
			conversation_users.count == 2 && conversation_users.find_by(user_id: second_user.id)
		end
	end

	def _create_personal_conversation(first_user, second_user)
		conversation = @course.conversations.create
		conversation.conversation_users.create(:user_id => first_user.id)
		conversation.conversation_users.create(:user_id => second_user.id) unless first_user == second_user
		conversation
	end
end
