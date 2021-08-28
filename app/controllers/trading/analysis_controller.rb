class Trading::AnalysisController < Trading::BaseController
	before_action :set_stock
    def index
        day_of_the_sale = params[:day_of_the_sale] || "Friday"
        @day_of_the_sale = day_of_the_sale
        @week_numbers, buy_prices = get_buy_prices_and_week_numbers
        @buy_price_hash = buy_prices.collect { |bp| [bp.week_number, bp.close_price] }.to_h
        @sell_price_hash = @stock.stock_prices.where(:week_number => @week_numbers, :day_of_the_week => day_of_the_sale).collect do |sp|
            [sp.week_number, sp.close_price]
        end.to_h
        _merge_holiday_sell_prices(day_of_the_sale)

        @percentage_changes = @week_numbers.collect do |week_number|
            change_percentage = (@sell_price_hash[week_number].to_f - @buy_price_hash[week_number])/@buy_price_hash[week_number]  * 100
            [week_number, change_percentage.round(2)]
        end.to_h
        @group_by_percentage_change = group_by_change_percentage(@percentage_changes.values)
        @days_in_a_week = days_in_a_week
    end


    def _merge_holiday_sell_prices(day_of_the_sale)
        missing_weeks = @week_numbers.select { |week_number| @sell_price_hash[week_number].nil? }
        groups_by_week_and_day = _group_by_week_and_day(missing_weeks)
        missing_weeks.each do |week_number|
            i = 0
            while(@sell_price_hash[week_number].blank? && i < 5)
                i = i + 1
                day_of_the_sale = prev_day(day_of_the_sale)
                @sell_price_hash[week_number] = groups_by_week_and_day[week_number][day_of_the_sale]
            end
        end        
    end

    def _group_by_week_and_day(missing_weeks)
        return @grouped_values if instance_variable_defined?:@grouped_values
        @grouped_values = @stock.stock_prices.select(:day_of_the_week, :close_price, :week_number).where(:week_number => missing_weeks)
            .group_by(&:week_number)
            .transform_values do |values|
                values.collect { |record| [record.day_of_the_week, record.close_price] }.to_h
            end
    end

    def prev_day(day)
        if day == "Friday"
            "Thursday"
        elsif day == "Thursday"
            "Wednesday"
        elsif day == "Wednesday"
            "Tuesday"
        else
            "Monday"
        end
    end

    def next_day(day)
        if day == "Monday"
            "Tuesday"
        elsif day == "Tuesday"
            "Wednesday"
        elsif day == "Wednesday"
            "Thursday"
        else
            "Friday"
        end
    end

    def days_in_a_week
        [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
        ]
    end

    def get_buy_prices_and_week_numbers
        decline_start_day = params[:decline_start_day] || "Monday"
        @decline_start_day = decline_start_day
        @continous_down_days = (params[:continous_down_days] || 1).to_i
        @perchange_change_in_a_day = (params[:perchange_change_in_a_day] || -2).to_i
        week_numbers = []

        iteration = @continous_down_days
        while(iteration >= 0)
            buy_prices = @stock.stock_prices.where(:day_of_the_week => decline_start_day)
            if @perchange_change_in_a_day > 0
                buy_prices = buy_prices.where("price_change_percentage > ?", @perchange_change_in_a_day)
            else
                buy_prices = buy_prices.where("price_change_percentage < ?", @perchange_change_in_a_day)                
            end
            
            if week_numbers.present?
                buy_prices = buy_prices.where(:week_number => week_numbers)
            end

            buy_prices = buy_prices.order("date DESC")
            week_numbers = buy_prices.collect(&:week_number)
            decline_start_day = next_day(decline_start_day)
            iteration -= 1
        end
        @actual_perchase_day = prev_day(decline_start_day)
        [week_numbers, buy_prices]
    end

    private

    def group_by_change_percentage(changes)
        changes.group_by { |change| categorize(change) }
    end

    def categorize(change)
        if change < -8
            "1 huge negative"
        elsif change < -4
            "2 mid negative"           
        elsif change < -1
            "3 negative"
        elsif change > -1 && change < 1
            "4 zero"
        elsif change < 4
            "5 positive"
        elsif change < 8
            "6 mid positive"
        else
            "7 huge positive"
        end
    end    
end