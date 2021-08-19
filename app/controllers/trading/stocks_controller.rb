class Trading::StocksController < Trading::BaseController
	before_action :set_stock, :except => [:index]
    PER_PAGE = 20
	def index
        @stocks = Stock.paginate(page: params[:page], per_page: PER_PAGE)
	end

    def earning_date_history
        redirect_to trading_stock_path(@stock) if @stock.earning_histories.present?
    end

	def import_earning_date_history
        read_csv_data.map do |row|
            date = row.to_h.values.first
            month, day, year = date.split("/")
            @stock.earning_histories.create(:earning_date => "#{year}-#{month}-#{day}")
        end
        flash[:notice] = "Saved Earning history for #{@stock.ticker_with_name}"
        redirect_to trading_stock_path(@stock)
	end

    def import_price_history
        read_csv_data.map do |row|
            @stock.create_stock_price(row.to_h)            
        end
        flash[:notice] = "Saved stock price history for #{@stock.ticker_with_name}"
        redirect_to trading_stock_path(@stock)
    end

    def price_history        
        redirect_to trading_stock_path(@stock) if @stock.stock_prices.present?
    end

    def show
        @earning_dates = @stock.formatted_earning_dates.collect { |date| [date, true]}.to_h
        if params[:all].present? || @stock.earning_histories.empty?
            @stock_history_records = @stock.stock_prices.paginate(page: params[:page], per_page: PER_PAGE).order("date DESC")
        else
            day_range = (params[:day_range] || 1).to_i
            near_by_dates = @stock.near_by_earning_dates(day_range)
            @stock_history_records = @stock.stock_prices.where(:date => near_by_dates).paginate(page: params[:page], per_page: 60).order("date DESC")
        end         
    end

    private
    def read_csv_data
        file = params[:stock][:file_field]
        csv_text = File.read(file.path)
        CSV.parse(csv_text, :headers => true)
    end

    def set_stock
        stock_id = params[:id] || params[:stock_id]
    	@stock = Stock.find(stock_id)
    end
end