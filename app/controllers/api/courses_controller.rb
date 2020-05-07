class Api::CoursesController < ApplicationController
	before_action :set_course, only: [:show]

	def show
		render json: @course, include: ['enrolled_users', 'conversations', 'conversations.messages', 'conversations.messages.sender']
	end

	private

	def set_course
		@course = current_user.enrolled_courses.find(params[:id])
	end
end
