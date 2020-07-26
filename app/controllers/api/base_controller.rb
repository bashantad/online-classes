class Api::BaseController < ApplicationController
	before_action :authenticate_user!

	protected

	def set_enrolled_course
		@course = current_user.enrolled_courses.find(_course_id)
	end

	def set_approved_course
		@course = Course.approved.find(_course_id)
	end

	private

	def _course_id
		params[:course_id] || params[:id]
	end
end
