namespace :radiant do
  namespace :extensions do
    namespace :kb_shortcuts do
      
      desc "Runs the migration of the Kb Shortcuts extension"
      task :migrate => :environment do
        require 'radiant/extension_migrator'
        if ENV["VERSION"]
          KbShortcutsExtension.migrator.migrate(ENV["VERSION"].to_i)
        else
          KbShortcutsExtension.migrator.migrate
        end
      end
      
      desc "Copies public assets of the Kb Shortcuts to the instance public/ directory."
      task :update => :environment do
        is_svn_or_dir = proc {|path| path =~ /\.svn/ || File.directory?(path) }
        puts "Copying assets from KbShortcutsExtension"
        Dir[KbShortcutsExtension.root + "/public/**/*"].reject(&is_svn_or_dir).each do |file|
          path = file.sub(KbShortcutsExtension.root, '')
          directory = File.dirname(path)
          mkdir_p RAILS_ROOT + directory
          cp file, RAILS_ROOT + path
        end
      end  
    end
  end
end
