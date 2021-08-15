class Trading::StocksController < Trading::BaseController
	def index
		@stocks = Stock.all
	end
end