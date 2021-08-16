class Trading::StocksController < Trading::BaseController
	before_action :set_stock, :except => [:index]
	def index
		@stocks = Stock.all
	end

	def import_earning_date_history

	end

    def import_price_history

    end

    def price_history

    end

    def show

    end

    def set_stock
    	@stock = Stock.find(params[:stock_id])
    end
end