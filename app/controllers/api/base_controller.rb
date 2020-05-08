class Api::BaseController < ApplicationController
	before_action :authenticate_user!

	protected

	def set_course
		course_id = params[:id] || params[:course_id]
		@course = current_user.enrolled_courses.find(course_id)
	end
end
