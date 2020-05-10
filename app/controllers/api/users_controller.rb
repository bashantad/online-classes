class Api::UsersController < Api::BaseController
	def current_user_state
		render json: current_user, serializer: UserSerializer
	end
end
