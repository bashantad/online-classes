class Teaching::BaseController < ApplicationController
	before_action :authenticate_user!

	protected
	def set_course_and_chapter
		set_owned_course
		@chapter = @course.chapters.find(params[:chapter_id])
	end
end
