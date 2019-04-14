class CreateCards < ActiveRecord::Migration[5.1]
  def change
    create_table :cards do |t|
      t.string  :type
      t.integer :user_id
      t.integer :project_id
      t.string  :name
      t.string  :description

      t.timestamps
    end
  end
end
