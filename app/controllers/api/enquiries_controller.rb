class Api::EnquiriesController < ApplicationController
  def create
    start_date = 1.day.ago
    if Enquiry.where("client_ip = ? AND created_at > ?", request.remote_ip, start_date).count > 5
      render_error_message("Your request is already submitted.")
    else
      enquiry = Enquiry.new(enquiry_params.merge(client_ip: request.remote_ip))
      if enquiry.save
        render_success_message("Your request is successfully submitted")
      else
        render json: {errors: enquiry.errors.messages }
      end
    end
  end

  private
  def enquiry_params
    params.require(:enquiry).permit(:full_name, :email, :phone, :enquiry_type, :message)
  end
end
