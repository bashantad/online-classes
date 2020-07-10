class CreateQualifications < ActiveRecord::Migration[6.0]
  def change
    create_table :qualifications do |t|
      t.string :name_of_institution
      t.integer :year_start
      t.string :type
      t.integer :year_end
      t.string :title
      t.string :location
      t.string :country
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
