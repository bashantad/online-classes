class Trading::StocksController < Trading::BaseController
	before_action :set_stock, :except => [:index]
    def index
        if params[:search].present?
            stocks = Stock.where("ticker ilike ?", "%#{params[:search]}%")
        elsif params[:incomplete_price].present?
            stock_ids = StockPrice.select("stock_id").distinct("stock_id").collect(&:stock_id).uniq
            stocks = Stock.where.not(:id => stock_ids)
        elsif params[:incomplete_dates].present?
            stock_ids = EarningHistory.select("stock_id").distinct("stock_id").collect(&:stock_id).uniq
            stocks = Stock.where.not(:id => stock_ids)
        elsif params[:incomplete_website].present?
            stocks = Stock.where(:main_website => nil)
        else
            stocks = Stock.all
        end
        @stocks = stocks.paginate(page: params[:page], per_page: PER_PAGE)
	end

    def earning_date_history
        redirect_to trading_stock_path(@stock) if @stock.earning_histories.present?
    end

    def import_earning_date_history
        begin
            read_csv_data.map do |row|
                date = row.to_h.values.first
                month, day, year = date.split("/")
                @stock.earning_histories.create(:earning_date => "#{year}-#{month}-#{day}")
            end
            flash[:notice] = "Saved Earning history for #{@stock.ticker_with_name}"
            redirect_to trading_stocks_path
        rescue => e
            flash[:alert] = e.message
            redirect_to trading_stock_earning_date_history_path(@stock)
        end
	end

    def import_price_history
        begin
            read_csv_data.map do |row|
                @stock.create_stock_price(row.to_h)
            end
            flash[:notice] = "Saved stock price history for #{@stock.ticker_with_name}"
            redirect_to trading_stocks_path
        rescue => e
            flash[:alert] = e.message
            redirect_to trading_stock_price_history_path(@stock)
        end
    end

    def price_history        
        redirect_to trading_stock_path(@stock) if @stock.stock_prices.present?
    end

    def show
        if params[:week_number].present?
            stock_prices = @stock.stock_prices.where(:week_number => params[:week_number]).order("date ASC")
        else
            if params[:all].present? || @stock.earning_histories.empty?
                stock_prices = @stock.stock_prices.order("date DESC")
            else
                day_range = (params[:day_range] || 1).to_i
                near_by_dates = @stock.near_by_earning_dates(day_range)
                stock_prices = @stock.stock_prices.where(:date => near_by_dates).order("date DESC")
            end            
        end
        @earning_dates = @stock.formatted_earning_dates.collect { |date| [date, true]}.to_h
        @stock_history_records = stock_prices.paginate(page: params[:page], per_page: PER_PAGE)
    end

    def update
        @stock.update(stock_params)
        flash[:notice] = "Updated the stock."
        redirect_to trading_stocks_path
    end

    private

    def stock_params
        params.require(:stock).permit(:main_website, :subsidiaries, :international_sites)
    end

    def read_csv_data
        file = params[:stock][:file_field]
        validate_file_name(file)
        csv_text = File.read(file.path)
        CSV.parse(csv_text, :headers => true)
    end

    def validate_file_name(file)
        filename = file&.original_filename&.downcase
        if params[:action] == "import_price_history"
            if filename != "#{@stock.ticker.downcase}.csv"
                raise "File mismatch, please make sure to upload price history from yahoo finance (#{@stock.ticker}.csv)"
            end
        else
            if filename != "#{@stock.ticker.downcase}-earnings.csv"
                raise "File mismatch, please make sure to upload earning dates from marketbeat (#{@stock.ticker}-earnings.csv)"
            end
        end
    end
end