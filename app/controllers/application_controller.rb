class ApplicationController < ActionController::Base
	CALL_JOIN_URL_PATTERN = /^calls\/\d+\/join\/\w+$/
	MESSAGE_URL_PATTERN = /^courses\/\d+\/conversations\/\d+\/messages$/
	COURSE_DETAIL_URL_PATTERN = /^courses\/\d+$/
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

	def set_owned_course
		@course = current_user.courses.find_by_id(get_course_id)
	end

	def get_course_id
		params[:course_id] || params[:id]
	end

	def serialize(model, options)
		serializable_resource = ActiveModelSerializers::SerializableResource.new(model, options)
		serializable_resource.as_json
	end

	def configure_permitted_parameters
		devise_parameter_sanitizer.permit(:sign_up, keys: [:full_name])
		devise_parameter_sanitizer.permit(:account_update, keys: [:full_name, :phone, :state, :street_address, :city, :zip_code, :country, :short_bio, :linkedin_url, :twitter_url])
	end

	def unprotected_routes?
		request.path == root_path || is_call_join_url? || course_detail_page?
	end

	def is_call_join_url?
		params[:path]&.match(CALL_JOIN_URL_PATTERN).present?
	end

	def is_message_url?
		params[:path]&.match(MESSAGE_URL_PATTERN).present?
	end

	def course_detail_page?
		params[:path]&.match(COURSE_DETAIL_URL_PATTERN).present?
	end

	def render_success_message(message)
		render json: {success: message}
	end

	def render_error_message(message)
		render json: {error: message}
	end
end
