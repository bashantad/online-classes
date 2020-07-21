class AddPreviewToCourseContents < ActiveRecord::Migration[6.0]
  def change
    add_column :course_contents, :preview, :boolean, default: false
  end
end
