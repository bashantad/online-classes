class Trading::BaseController < ApplicationController
	before_action :authenticate_user!
	before_action :authenticate_trader!

	protected
	def authenticate_trader!
		unless current_user.is_trader?
			flash[:notice] = "You don't have permission to access this site"
			redirect_to root_path
		end
	end
end
