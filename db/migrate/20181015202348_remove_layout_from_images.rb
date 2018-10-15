class RemoveLayoutFromImages < ActiveRecord::Migration[5.1]
  def change
    remove_column :images, :layout, :boolean
  end
end
