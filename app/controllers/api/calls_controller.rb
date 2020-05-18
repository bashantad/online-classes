class Api::CallsController < Api::BaseController
  def create
    head :no_content
    ActionCable.server.broadcast("calls_channel", call_params)
  end

  def call_params
    params.permit(:call, :type, :from, :to, :sdp)
  end
end
