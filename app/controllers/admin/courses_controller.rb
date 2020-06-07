class Admin::CoursesController < Admin::BaseController
	before_action :set_course, except: [:index]

	def index
		@courses = Course.all
	end

	def approve
		@course.approve
		flash[:notice] = "#{@course.title} has been approved"
		redirect_to admin_courses_path
	end

	def disapprove
		@course.disapprove
		flash[:notice] = "#{@course.title} has been disapproved"
		redirect_to admin_courses_path
	end

	def enrollment

	end

	def enroll_users
	end

	def enrolled_users

	end

	private

	def set_course
		@course = Course.find(params[:course_id])
	end
end
