class CreateChecklistitems < ActiveRecord::Migration[5.1]
  def change
    create_table :checklistitems do |t|
      t.string :name
      t.integer :checklist_id

      t.timestamps
    end
  end
end
