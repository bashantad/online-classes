class Admin::CoursesController < Admin::BaseController
	before_action :set_course, except: [:index]

	def index
		@courses = Course.where(approved: params[:approved])
	end

	def approve
		@course.approve
		flash[:notice] = "#{@course.title} has been approved. Now, this will be available to the general public."
		redirect_to admin_courses_path(approved: false)
	end

	def disapprove
		@course.disapprove
		flash[:notice] = "#{@course.title} has been disapproved. Now, this will be unavailable to the general public. "
		redirect_to admin_courses_path(approved: true)
	end

	private

	def set_course
		@course = Course.find(params[:course_id])
	end
end
