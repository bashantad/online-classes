class Api::CallsController < Api::BaseController
  skip_before_action :authenticate_user!, only: [:join]

  def create
    if current_user.is_within_call_limit?
      @retry_limit = 0
      call = _new_call_with_retry
      if call
        call.save
        render json: call
      else
        render json: {error: 'Call can not be initiated.'}
      end
    else
      render json: {error: 'You have already reached the call limit. Contact us at support@thevcroom.com to increase the limit.'}
    end
  end

  def join
    user = User.find(params[:user_id])
    @call = user.calls.find_by(calling_code: params[:calling_code])
    if @call.blank?
      render json: {error: 'Invalid calling link'}
    else
      if request.get?
        render json: {}
      else
        head :no_content
        ActionCable.server.broadcast("calls_channel", call_params)
      end
    end
  end

  def call_params
    params.permit(:call, :type, :from, :to, :sdp, :calling_code, :user_id)
  end

  def _new_call_with_retry
    (0..Call::RETRY_CODE_GENERATION_LIMIT).each do
      call = current_user.calls.new(calling_code: _random_alpha_numeric_code)
      @retry_limit = @retry_limit + 1
      return call if call.valid?
      redo if @retry_limit < Call::RETRY_CODE_GENERATION_LIMIT
    end
    nil
  end

  def _random_alpha_numeric_code
    [*('a'..'z'),*('0'..'9'),*('A'..'Z')].shuffle[0,8].join
  end
end
