class ApplicationController < ActionController::Base
	before_action :configure_permitted_parameters, if: :devise_controller?

	def authenticate_admin!
		authenticate_user!
		unless current_user.is_admin?
			flash[:notice] = "You don't have permission to access this page"
			redirect_to root_path
		end
	end

	protected

	def configure_permitted_parameters
		devise_parameter_sanitizer.permit(:sign_up, keys: [:full_name])
	end
end
