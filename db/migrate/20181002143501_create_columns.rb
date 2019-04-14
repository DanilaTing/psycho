class CreateColumns < ActiveRecord::Migration[5.1]
  def change
    create_table :columns do |t|
      t.integer :board_id
      t.string  :name
      t.integer :position

      t.timestamps
    end
  end
end
