class CreateBoards < ActiveRecord::Migration[5.1]
  def change
    create_table :boards do |t|
      t.string :name
      t.integer :project_id
      t.integer :position

      t.timestamps
    end
  end
end
