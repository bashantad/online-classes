class Api::BaseController < ApplicationController
	before_action :authenticate_user!

	protected

	def set_enrolled_course
		@course = current_user.enrolled_courses.find_by_id(_course_id)
		return if @course.present?
		set_owned_course
	end

	def set_approved_course
		@course = Course.approved.find_by_id(_course_id)
		return if @course.present? || !user_signed_in?
		set_owned_course
	end

	def set_owned_course
		@course = current_user.courses.find(_course_id)
	end

	private

	def _course_id
		params[:course_id] || params[:id]
	end
end
