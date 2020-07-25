class RemoveDescriptionFromNotes < ActiveRecord::Migration[6.0]
  def change
    remove_column :notes, :description, :text
  end
end
