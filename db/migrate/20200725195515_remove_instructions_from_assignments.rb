class RemoveInstructionsFromAssignments < ActiveRecord::Migration[6.0]
  def change
    remove_column :assignments, :instructions, :text
  end
end
