use strict; 
use warnings; 
# use Mojo::DOM;
use 5.38.2; 
use Data::Printer; 
use Data::Dumper;

my $file = './views/partials/header.ejs'; 
# my $file_contents = do { local $/ = undef; open my $fh, '<', $file; <$fh> };

 
# Parse
# my $dom = Mojo::DOM->new($file_contents);
 
# Find
# say $dom->at('#b')->text;
# say $dom->find('p')->map('text')->join("\n");
# say $dom->find('[id]')->map(attr => 'id')->join("\n");
 
# Iterate
# $dom->find('p[id]')->reverse->each(sub { say $_->{id} });

# print Dumper( PackageNameHere->meta );
 
# Loop
# for my $e ($dom->find('nav')->each) {
  # say $e->{id}, ':', $e->text;
  # p $e->attr('id'); 
  # say $dom->find('*')->map(attr => 'id')->compact->join("\n");
  # print Dumper( \$e->meta );
  # if ($e->id) {
  #     say $e->{id}; 
  # }
# }
 
# Modify
# $dom->find('div p')->last->append('<p id="c">456</p>');
# $dom->at('#c')->prepend($dom->new_tag('p', id => 'd', '789'));
# $dom->find(':not(p)')->map('strip');
 
# Render
# say "$dom";

open my $fh, ($file); 

while (<$fh>) {
    # echo -e "\e[35mPurple\e[0m"
    # echo -e "\e[34mBlue\e[0m"
    # echo -e "\e[33mYellow\e[0m"
    # echo -e "\e[32mGreen\e[0m"
    my ($indentation, $tag, $classlist) = $_ =~ /^( *)<([a-z]+).*class="([^"]+)"/; 
    if ($classlist) {
        print "$indentation"; 
        print "\e[95m$tag\e[92m" if $tag; 
        print "\.$classlist\e[0m" if $classlist; 
        print "\n"
    } else {
        my ($indentation, $tag) = $_ =~ /^( *)<([a-z]+)/; 
        if ($tag) {
            print "$indentation"; 
            print "\e[95m$tag\e[0m"; 
            print "\n"; 
        }
    }
}

close $fh; 
