class CallsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "calls_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
