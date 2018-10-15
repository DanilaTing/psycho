class CreateImages < ActiveRecord::Migration[5.1]
  def change
    create_table :images do |t|
      t.string :image
      t.string :name
      t.boolean :layout

      t.timestamps
    end
  end
end
