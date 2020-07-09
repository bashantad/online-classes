class UsersController < ApplicationController
	layout "theme"
	before_action :authenticate_user!
	before_action :_set_user

	def update_password
		if @user.update(_user_params)
			bypass_sign_in(@user)
			redirect_to root_path
		else
			render :edit_password
		end
	end

	def do_upload
		if params[:user][:file].present?
			current_user.avatar_image.attach(params[:user][:file])
		elsif params[:user][:camera].present?
			current_user.avatar_image.attach(_get_blob)
		end
		redirect_to upload_users_path
	end

	def _set_user
		@user = current_user
	end

	def _user_params
		params.require(:user).permit(:password, :password_confirmation)
	end

	def _get_blob
		ActiveStorage::Blob.create_after_upload!(
			io: StringIO.new((Base64.decode64(params[:user][:camera].split(",")[1]))),
			filename: "user.png",
			content_type: "image/png",
		)
	end
end
