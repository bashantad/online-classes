class HomePageController < ApplicationController
	layout "core"
	before_action :authenticate_react_app_user!
	def index
	end
end
