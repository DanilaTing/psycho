class CreateBoards < ActiveRecord::Migration[5.1]
  def change
    create_table :boards do |t|
      t.integer :user_id
      t.integer :project_id
      t.integer :position
      t.string  :name
      t.boolean :general

      t.timestamps
    end
  end
end
