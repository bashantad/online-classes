class AddIndexInCallCodeToCalls < ActiveRecord::Migration[6.0]
  def change
    add_index :calls, :calling_code
  end
end
