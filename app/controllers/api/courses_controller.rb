class Api::CoursesController < ApplicationController
	before_action :set_course, only: [:show]

	def show
		render json: @course, include: ['enrolled_users', 'conversations']
	end

	private

	def set_course
		@course = current_user.courses.find(params[:id])
	end

end
