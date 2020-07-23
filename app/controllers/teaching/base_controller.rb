class Teaching::BaseController < ApplicationController
	layout "theme"
	before_action :authenticate_user!

	protected
	def set_course
		@course = current_user.courses.find(params[:course_id])
	end

	def set_course_and_chapter
		set_course
		@chapter = @course.chapters.find(params[:chapter_id])
	end
end
