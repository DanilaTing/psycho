class RemoveImageFromImages < ActiveRecord::Migration[5.1]
  def change
    remove_column :images, :image, :string
  end
end
