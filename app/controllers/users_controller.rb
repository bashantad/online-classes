class UsersController < ApplicationController
	before_action :authenticate_user!
	before_action :set_user

	def update_password
		if @user.update(user_params)
			bypass_sign_in(@user)
			redirect_to root_path
		else
			render :edit_password
		end
	end

	def edit_password

	end

	def cancel_account

	end

	def details

	end

	def set_user
		@user = current_user
	end

	def user_params
		params.require(:user).permit(:password, :password_confirmation)
	end
end
