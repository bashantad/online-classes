class Trading::StocksController < Trading::BaseController
	before_action :set_stock, :except => [:index]
	def index
        @stocks = Stock.paginate(page: params[:page], per_page: 20)
	end

	def import_earning_date_history

	end

    def import_price_history
        file = params[:stock][:file_field]
        csv_text = File.read(file.path)
        csv_data = CSV.parse(csv_text, :headers => true)
        records = csv_data.map do |row|
            @stock.create_stock_price(row.to_h)            
        end
        flash[:notice] = "Saved stock price history for #{@stock.ticker_with_name}"
        redirect_to trading_stock_path(@stock)
    end

    def price_history        
        redirect_to trading_stock_path(@stock) if @stock.stock_prices.present?        
    end

    def show
        @stock_history_records = @stock.stock_prices.paginate(page: params[:page], per_page: 20).order("date DESC")
    end

    private
    def set_stock
        stock_id = params[:id] || params[:stock_id]
    	@stock = Stock.find(stock_id)
    end
end