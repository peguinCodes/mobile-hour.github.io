use strict; 
use warnings; 
use Data::Printer; 


my $css_file = "./static/css/style.css"; 
my $scss_file = "./static/css/style.scss"; 

my @var = do { open my $fh, '<', $scss_file; <$fh> };
print $#var; 

sub get_empty_lines {
    open my $fh, ($css_file); 
    close $fh; 
    my @results; 
    my @lines; 
    while (<$fh>) { push(@lines, $_); }
    my $i = 0; 
    while ($i<=$#lines) {
        while ($lines[$i] =~ /^[\s\t]*\n/ and $lines[$i+1] =~ /^[\s\t]*\n/) {
            push(@results, $i+1); 
            $i++; 
        }
        $i++; 
    }
}


sub get_padding_dimensions {
    open my $fh, ($css_file); 
    my @results; 
    my $i = 0; 
    while (<$fh>) {
        if (/padding\: ([0-9]+(?:\.[0-9]+)?)([a-z]+);/) {
            chomp $1; 
            push(@results, "$1 $2"); 
        }
        $i++; 
    }
    close $fh; 
    return reverse sort @results; 
}


sub get_fonts_using_px_as_rem {
    open my $fh, ($css_file); 
    my $i = 0; 
    while (<$fh>) {
        if (/(font.*): (-?\d+(\.\d+)?)px/) {
            my $unit_as_rem = $2/16; 
            print "line $i:    $1 $2px --> $unit_as_rem" . " rem\n"; 
        }
        $i++; 
    }
    close $fh; 
}


sub get_media_query_breakpoints {
    open my $fh, "$scss_file"; 
    my %seen;
    for (<$fh>) {
        if (/\@media.*(min-width|max-width): (\d+)([a-z]+)/) {
            $seen{"$1 $2 $3"}++; 
        } 
    };
    close $fh; 
}


sub get_selectors_used {
    open my $fh, "$scss_file"; 
    my %seen;
    for (<$fh>) {
        if (/(^[\s\t]*)([\w\#\-\.\,\s]+) \{/) {
            $seen{"$1$2"}++; 
        } 
    };
    return %seen; 
    close $fh; 
}

my %results = +(get_selectors_used()); 
p %results; 
