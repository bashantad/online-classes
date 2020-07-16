class ApplicationController < ActionController::Base
	layout "theme"
	CALL_JOIN_URL_PATTERN = /^calls\/\d\/join\/\w+$/
	REACT_ROUTES = {
		qualifications: '/users/qualifications',
		home: '/',
	}
	before_action :configure_permitted_parameters, if: :devise_controller?

	def authenticate_admin!
		authenticate_user!
		unless current_user.is_admin?
			flash[:notice] = "You don't have permission to access this page"
			redirect_to root_path
		end
	end

	def authenticate_react_app_user!
		unless unprotected_routes?
			authenticate_user!
		end
	end

	protected

	def configure_permitted_parameters
		devise_parameter_sanitizer.permit(:sign_up, keys: [:full_name])
		devise_parameter_sanitizer.permit(:account_update, keys: [:full_name, :phone, :state, :street_address, :city, :zip_code, :country, :short_bio, :linkedin_url, :twitter_url])
	end

	def unprotected_routes?
		request.path == root_path || is_call_join_url?
	end

	def is_call_join_url?
		params[:path]&.match(CALL_JOIN_URL_PATTERN).present?
	end
end
