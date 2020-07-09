class HomePageController < ApplicationController
	layout "theme"
	before_action :authenticate_react_app_user!
	def index
		render layout: "core"
	end
end
