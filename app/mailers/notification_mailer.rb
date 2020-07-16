class NotificationMailer < ApplicationMailer
	def invite_to_course
		enroll_request = params[:enroll_request]
		@course = enroll_request.course
		@sender = @course.owner
		@full_name = enroll_request.full_name
		@email = enroll_request.email
		mail(to: @email, subject: "#{@sender.name} has invited you to #{@course.title}")
	end
end
