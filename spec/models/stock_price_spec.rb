require 'rails_helper'

describe StockPrice do
	describe "week_number" do
		it "calculates the date correctly" do
			start_date = 2.years.ago
			dates = []
			while(start_date < 2.days.ago)
				dates << start_date
				start_date = start_date + 1.day
			end

			weeks = dates.group_by { |date| StockPrice.week_number(date) }.transform_values { |values| values.collect {|value| value.strftime("%A") }}
			expect(weeks.values.uniq.count).to eq(3)
		end
	end
end