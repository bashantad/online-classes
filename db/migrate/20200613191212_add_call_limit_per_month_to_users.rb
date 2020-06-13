class AddCallLimitPerMonthToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :call_limit_per_month, :integer, :default => 20
  end
end
