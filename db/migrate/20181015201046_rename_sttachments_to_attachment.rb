class RenameSttachmentsToAttachment < ActiveRecord::Migration[5.1]
    def self.up
      rename_table :sttachments, :attachments
    end
end
