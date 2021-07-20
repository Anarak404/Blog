-- ROLE
create table if not exists role
(
    id integer generated by default as identity
    constraint role_pkey
    primary key,
    name integer not null
);

alter table role owner to postgres;

insert into role (id, name)
values (1, 0),
       (2, 1),
       (3, 2);


-- USER
create table if not exists app_user
(
    id integer generated by default as identity
    constraint app_user_pkey
    primary key,
    mail varchar(255) not null
    constraint uk_6ugyotl3w1pysod9y4qurrg35
    unique,
    name varchar(255) not null,
    password varchar(255) not null,
    role integer not null
    constraint fklihs4nehrjweu11mm8cjj8356
    references role
    );

alter table app_user owner to postgres;

insert into app_user (mail, name, password, role)
values ('admin@op.pl', 'Admin', '$2y$10$Y7bC6.lv0IZhQPuXv4h7q.dqiU8at8Jwk2TOW98pkbKNcxuAId8vq', 1),
       ('ania@op.pl', 'Ania', '$2y$10$RXbT4RzQS7D4b0KaCI7sLeve0pWEZRzBhULqoDLdikkKs7parakkG', 2),
       ('ola@op.pl', 'Ola', '$2y$10$2.NJ.yWx6V8foIwkYWvx5.fHYfHshHyjNTOVwlGuDqqjw1sJDLNzi', 2),
       ('marian@op.pl', 'Marian', '$2y$10$6LnkQWBvoG3WGv5vmeWFfONtAFKhSkUjzVFElK/e6Z0Vfr1vzAUQq', 3),
       ('stanislaw@op.pl', 'Stanislaw', '$2y$10$GVjMHDJIZlEfBumvEPUbLuG6tdgIgFteTSP7HPbRo7stbD2ZBraZ2', 3),
       ('kasia@op.pl', 'Kasia', '$2y$10$s7vWpVvBgtFaxTC5BrVbDOez6sEJ5DI4asyNkIFPgn94m8q2WpbK2', 3),
       ('mateusz@op.pl', 'Mateusz', '$2y$10$ZveZGLGThU50AlIaMY2aNOKyLYak/zQhsZmk2Marsa8/sCdspJbYi', 3);


-- POST
create table if not exists post
(
    id integer generated by default as identity
    constraint post_pkey
    primary key,
    content text not null,
    creation_date timestamp,
    modification_date timestamp,
    title varchar(255) not null,
    creator integer not null
    constraint fkqmusxxlroaj3x3y2l0vorlxkx
    references app_user,
    last_modifier integer not null
    constraint fkepnlrs6hc6r341ly5hgr9dirx
    references app_user
    );

alter table post owner to postgres;

insert into post (content, creation_date, modification_date, title, creator, last_modifier)
values ('Piwonie, inaczej peonie (Paeonia), to niezwykle urodziwe byliny lub niskie krzewy, które osiągają ok. 80 cm wysokości (niektóre odmiany nawet do 1). W ogrodach najczęściej uprawia się odmiany i mieszańce piwonii chińskiej (Paeonia lactiflora).

Rośliny te posiadają charakterystyczne liście – są one intensywnie zielone, pierzastosieczne i głęboko-klapowane. Największe znaczenie mają jednak przepiękne kwiaty peonii – w zależności od odmiany pojawiają się od maja do czerwca. Występują w barwach białej, żółtej, różowej, czerwonej oraz w dwóch kolorach. Mogą być również najróżniejszych typów budowy!

Oprócz podziału na pełne (brak pręcików i słupka), półpełne (niewiele pręcików, często ułożonych pomiędzy płatkami) oraz pojedyncze (jeden okółek płatków otaczających pręciki) można je dodatkowo klasyfikować na rodzaje kwiatów:

Pojedyńcze
kwiat typu lotosu – 2 lub 3 rzędy płatków zewnętrznych w tym ich środkowy rząd ma tendencję do wyginania się do góry .
kwiat japoński – 1 okółek płatków zewnętrznych, pręciki długie, przekształcone w kulę.
kwiat anemonowy – często dwubarwne, jeden okółek płatków zewnętrznych, wewnętrzne przypominające długie, cienkie "piórka"; pręciki zwykle niewidoczne.

Półpełne
kwiat typu chryzantema – 4 do 8 okółków płatków zewnętrznych; krótkie, żółte pręciki widoczne w centrum.
kwiat typu golden circle (złota obręcz) – pręciki widoczne pomiędzy płatkami zewnętrznymi, a wewnętrznymi kwiatu (tworzące "żółty przedziałek").

Pełne
kwiat typu róży – do 20 rzędów płatków; pręciki właściwie niewidoczne.
kwiat typy triple decker (trójpoziomowy) – podobny do golden circe lecz większy, pomiędzy płatkami zewnętrznymi, a wewnętrznymi, różniący się rząd cienkich "trzecich" płatków. Bardzo młode odmiany piwonii.
kwiat korona – 1 lub 2 rzędy szerokich płatków brzeżnych, cieknie i średniodługie płatki wewnętrzne; pręciki niewidoczne.
kwiat typu bomb (bomby) – 1 lub 2 rzędy szerokich płatków brzeżnych, pośrodku duża kula z krótkich, pokręconych płatków wewnętrznych.
kwiat typu hundred proliferate (rozplemiony) – bardzo duże, płatki cieńsze i gęściej ułożone niż u typu korony.', now(), now(), 'Uprawa piwonii (peonii) w ogrodzie', 2,2),
       ('Przemarznięcie rośliny
Hortensja ogrodowa kwitnie na zeszłorocznych pędach, czyli na tych częściach rośliny, które najbardziej są narażone na przemarznięcie w czasie zimy oraz które mogą być uszkodzone przez wiosenne przymrozki.
DOBRA RADA
Osłaniaj wrażliwe krzewy, zwłaszcza te, które rosną w miejscach narażonych na podmuchy zimnego wiatru. Monitoruj prognozę pogody, zwłaszcza wczesną wiosną, i zabezpieczaj krzewy agrowłókniną, gdy mają przyjść przymrozki.

Nieprawidłowe cięcie
TO NAJCZĘSTSZA PRZYCZYNA BRAKU KWITNIENIA HORTENSJI! Hortensja ogrodowa, w przeciwieństwie do hortensji bukietowej, kwitnie na pędach zeszłorocznych (które wyrosły w roku poprzednim i przezimowały), dlatego ich przemarznięcie lub wycięcie powoduje brak formowania się pąków kwiatowych.
DOBRA RADA
Sprawdź, którą hortensję masz w ogrodzie i jeśli posiadasz ogrodową (Hydrangea macrophylla) to nie przycinaj jej wcale! Możesz jedynie wyciąć zeschłe kwiatostany późną jesienią.

Zbyt dużo cienia
Hamuje rozwój pąków kwiatowych.
DOBRA RADA
Późną jesienią jesienią przesadź hortensję w miejsce półcieniste.

Zbyt zasadowy odczyn gleby
Przyczynia się do słabego rozwoju rośliny, liście żółkną, jest to tzw. chloroza liści.
DOBRA RADA
Zbadaj odczyn podłoża i w razie potrzeby zastosuj specjalny nawóz do hortensji, który oprócz kompleksowego zasilania w składniki mineralne ma działanie obniżające pH. Stosuj także ściółkę z kory sosnowej, która rozkładając się dodatkowo zakwasza podłoże.

Zbyt suche podłoże
Hamuje rozwój rośliny, która z braku wody szybko więdnie i nie ma sił na rozwój pąków kwiatowych.
DOBRA RADA
Hortensja uwielbia regularne i obfite podlewanie. Jej łacińska nazwa Hydrangea oznacza "wodny krzew". Podlewaj krzew regularnie, a w okresie suszy codziennie! Kilkucentymetrowa warstwa ściółki dodatkowo ograniczy parowanie wody!', now(), now(), 'Dlaczego hortensja ogrodowa nie kwitnie?', 3,3),
       ('Środki ochrony roślin są czasem niezbędne, jeśli chcemy utrzymać nasze uprawy. Pojawieniu się problemów (chorób i szkodników) sprzyjają złe warunki (źle dobrane stanowisko, podłoże, zagęszczenie, osłabienie w wyniku nawożenia lub jego braku), dlatego też pierwszym krokiem w rozwiązywaniu problemu powinno być znalezienie jego przyczyny. Czasem jest to właśnie niewłaściwa uprawa!

Unikniesz wielu problemów sadząc rośliny w odpowiednim podłożu, dostosowanym do ich wymagań oraz stosując zrównoważone nawożenie. Wzmocnisz je dodatkowo stosując stymulatory wzrostu (np. Biosept Active – zawierający wyciąg z grapefuita). Unikniesz wielu chorób glebowych, stosując odpowiednie preparaty zapobiegawcze (np. Agricolle – zawierający wodny roztwór naturalnych wielocukrów) lub preparaty zawierające pożyteczne mikroorganizmy (np. Polyversum – zawierający niepatogeniczne pasożytnicze grzyby Pythium oligandrum, które zasiedlając strefę korzeniową hamują rozwój grzybów chorobotwórczych).

Stosuj także regularnie nawozy organiczne! Obornik, najlepszy nawóz i polepszacz glebowy w jednym, wprowadza do gleby cenną próchnicę i pożyteczne organizmy. Jeśli nie masz do niego dostępu, to stosuj suszony obornik granulowany lub biohumus od dżdżownic kalifornijskich, który nie tylko nawozi glebę, ale także wzmacnia rośliny i uodparnia je na ataki.', now(), now(), 'ABC opryskiwania', 2,2),
       ('Gnojówka z pokrzywy to naturalny skuteczny środek ochrony roślin i doskonały nawóz, który możesz stosować w swoim ogrodzie bez obaw, że zaszkodzisz naturalnemu środowisku. Wielu ogrodników zaskoczonych jest jej skutecznością i raz na zawsze zmienia zdanie o pokrzywie! Dowiedz się, jak przygotować gnojówkę, zastosuj ją w swoim ogrodzie, a już nigdy nie nazwiesz pokrzywy chwastem! Skuteczność gnojówki i wywaru z pokrzywy (oraz innych naturalnych preparatów) jest często podawana pod wątpliwość przez profesjonalnych ogrodników używających chemicznych nawozów i środków ochrony roślin. Na pewno nie jest ona tak skuteczna jak chemiczne pestycydy, jednak przy niewielkiej liczebność szkodnika czy wstępnej fazie choroby jest bardzo skuteczna!', now(), now(), 'Gnojówka z pokrzywy: jak przygotować i stosować?', 3,3),
       ('Ślimaki nagie (czyli bezmuszlowe, bezskorupowe) różnią się wielkością i kolorem – mogą osiągać od 3 do 6 cm oraz mieć kolory od szarego, czarnego i pomarańczowobrązowego do bladożółtego. Żyją pod ziemią lub na jej powierzchni.

Ślimaki nagie są aktywne przez cały sezon, a najwięcej zniszczeń powodują, gdy mają w zasięgu dużo miękkich tkanek roślin. Atakują praktycznie wszystkie rośliny ogrodowe, jednak do ich przysmaków należą sałata, buraki ćwikłowe, cukinie, owoce truskawek, funkie, ostróżki, groszek cukrowy i pędy narcyzów. Objawem ich żerowania są nieregularne ubytki wygryzione w liściach, czasami w kwiatach. Zniszczone mogą zostać także młode, delikatne pędy, a siewki – zjedzone w całości. Często można zauważyć srebrzysty, śluzowy ślad.', now(), now(), 'Sposoby na ślimaki nagie', 3,3),
       ('Jak rozsądnie nawadniać ogród w czasie suszy?
3 zasady, o których warto pamiętać
Pierwsza, znana i dobra zasada mówi, aby w czasie gorących, słonecznych dni podlewać rośliny albo wcześnie rano albo wieczorem.

Najkorzystniej jest nawadniać rośliny letnią wodą, by uniknąć szoku termicznego, na jaki narażone są rośliny (także trawniki) przy podlewaniu bardzo zimną wodą wodociągową.

Najlepiej także podlewać nasadzenia bezpośrednio do gleby i nie moczyć liści (igieł) lub całej rośliny (podlewanie roślin w ciągu upalnego dnia w samo południe, może szybko prowadzić do poparzeń słonecznych, ale również do strat wody, gdyż część z niej będzie szybko wyparowywać).

Jeśli ogród podlewamy za pomocą automatycznego systemu nawadniającego (spryskiwacze, zraszacze itp.), najlepiej zaprogramować jego działanie w nocy albo nad ranem lub pomyśleć o nawadnianiu kropelkowym. Dzięki systemowi nawadniania kropelkowego (kroplowniki rozmieszczone są na specjalnych przewodach rozłożonych wśród roślin), możemy znacząco ograniczyć niepotrzebne straty wody, zaplanować porę podlewania i dostarczyć roślinie optymalną ilość dostępnej dla roślin wody w strefę korzeni.', now(), now(), 'Jak dbać o ogród w czasie suszy?', 1,1),
       ('Praca w ogrodzie to dla ogrodnika największa radość, pod warunkiem że przebiega szybko i przyjemnie. Wiosną, latem, jesienią i zimą – przez cały rok – wokół domu i w ogrodzie zawsze jest coś do zrobienia. Nie wystarczą tylko dobre chęci i ręce gotowe do pracy! Odpowiednie narzędzie pomogą Ci zadbać o glebę, rośliny i porządek! Skompletuj taki zestaw narzędzi, aby móc wykonać różnorodne prace bez większego, niż jest to konieczne, wysiłku!

Jeżeli ogrodnictwo jest Twoją pasją, wybierz narzędzia FISKARS , które ułatwią wykonywanie każdej czynności w ogrodzie. Niezależnie od tego, czy pielisz, rąbiesz, zamiatasz czy tniesz, nasze narzędzia uczynią każdą pracę łatwiejszą i wydajniejszą o każdej porze roku. Rośliny ozdobne
Palikujemy wysokie byliny na rabatach (m.in. ostróżki, dalie, mieczyki), aby pod wpływem ciężaru kwiatów nie połamały się.
Przycinamy byliny, które już przekwitły. Dzięki temu niektóre gatunki powtórzą kwitnienie, choć nie będzie ono już tak efektowne, jak za pierwszym razem. Pamiętajmy w szczególności o różach. Wiele odmian może kwitnąć nawet do października.
Regularnie odchwaszczamy rabaty i podłoże pod krzewami. W razie konieczności uzupełniamy warstwę ściółki, która zmniejsza parowanie wody z gleby i zapobiega rozwojowi chwastów.
Do połowy miesiąca nawozimy rośliny ozdobne środkami zawierającymi azot.
Nawozimy i podlewamy rośliny uprawiane w pojemnikach. Jeśli planujemy dłuższą nieobecność w domu, warto zamontować w donicach system automatycznego nawadniania (automatyczna konewka) lub ustawić w doniczkach dozowniki do wody. Usuwamy regularnie suche i uszkodzone liście oraz przekwitnięte kwiaty.
Jeśli jest chłodniej i pochmurno można rozsadzać byliny, które kwitły wiosną (kosaćce, macierzanka, rojniki, floksy, prymulki).
Przeglądamy rośliny pod kątem chorób i szkodników roślin. W pierwszej kolejności sięgamy po mechaniczne i ekologiczne sposoby zwalczania, a dopiero później po środki chemiczne.
Przycinamy zbyt mocno rozrośnięte gatunki iglaste (dzięki temu rośliny się zagęszczą i zyskają ładny pokrój).
Zdrowe resztki roślin wyrzucamy na kompost.', now(), now(), 'Lipiec w ogrodzie – co robić?', 1,1);