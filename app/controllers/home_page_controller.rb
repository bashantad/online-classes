class HomePageController < ApplicationController
	layout "core"
	before_action :authenticate_react_app_user!, only: [:index]

	def index
		@is_message_url = is_message_url?
	end

	def verify
		render :layout => false		
	end
end
