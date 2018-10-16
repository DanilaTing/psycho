class AddVideoToAttachments < ActiveRecord::Migration[5.1]
  def change
    add_column :attachments, :video, :string
  end
end
