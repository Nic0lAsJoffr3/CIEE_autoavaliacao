/* Entrelinhas — banco de perguntas e regras de avaliação.
   Para adicionar perguntas, acrescente objetos ao array QUESTION_BANK.
   Cada opção recebe uma pontuação de 0 a 3, definida individualmente. */
(() => {
  'use strict';

  const STORAGE_KEY = 'entrelinhas_evaluations_v1';
  const CATEGORIES = [
    { id: 'emocional', name: 'Inteligência emocional', short: 'Inteligência emocional', description: 'Como você reconhece e administra emoções e reage a situações difíceis.', strength: 'Você demonstra recursos para reconhecer emoções e atravessar situações difíceis.', focus: 'Pode ser útil desenvolver mais consciência sobre suas emoções e sobre como reage sob pressão.', action: 'Faça uma pausa antes de reagir', detail: 'Quando algo incomodar, pare por alguns segundos e nomeie o que está sentindo antes de decidir como responder.', cadence: 'PRÁTICA DIÁRIA · 2 MIN' },
    { id: 'disciplina', name: 'Disciplina e consistência', short: 'Disciplina e consistência', description: 'Sua capacidade de manter compromissos e continuar mesmo quando a motivação diminui.', strength: 'Você parece conseguir transformar intenções em ações consistentes.', focus: 'A constância pode ser uma área importante para trabalhar, especialmente quando a motivação oscila.', action: 'Diminua a meta, mantenha a frequência', detail: 'Escolha um hábito pequeno e fácil de repetir. Acompanhe a frequência por sete dias, em vez de tentar fazer tudo de uma vez.', cadence: 'EXPERIMENTO · 7 DIAS' },
    { id: 'organizacao', name: 'Produtividade e organização', short: 'Produtividade e organização', description: 'Como você planeja tarefas, administra tempo e lida com prioridades.', strength: 'Você demonstra organização para definir prioridades e administrar suas tarefas.', focus: 'Planejamento e gestão do tempo podem merecer mais atenção para reduzir a sobrecarga.', action: 'Planeje apenas as três prioridades', detail: 'No começo do dia, anote as três tarefas mais importantes, estime o tempo de cada uma e comece pela primeira.', cadence: 'ROTINA · 5 MIN/DIA' },
    { id: 'aprendizado', name: 'Aprendizado e conhecimento', short: 'Aprendizado e conhecimento', description: 'Sua curiosidade, abertura para aprender e aplicação do que descobre.', strength: 'Você demonstra abertura para aprender e desenvolver conhecimentos.', focus: 'Vale criar oportunidades mais consistentes para praticar, revisar e aplicar o que aprende.', action: 'Transforme conteúdo em prática', detail: 'Depois de estudar algo, explique com suas palavras ou use o conhecimento em um exercício pequeno no mesmo dia.', cadence: 'APÓS CADA ESTUDO' },
    { id: 'profissional', name: 'Desenvolvimento profissional', short: 'Desenvolvimento profissional', description: 'Responsabilidade, iniciativa, comunicação e desenvolvimento de competências para o trabalho.', strength: 'Você demonstra atitudes que podem apoiar seu desenvolvimento profissional.', focus: 'Pode ser útil fortalecer iniciativa, comunicação ou responsabilidade nas situações profissionais.', action: 'Escolha uma competência para praticar', detail: 'Defina uma habilidade profissional específica e procure uma oportunidade real de praticá-la nesta semana.', cadence: 'META SEMANAL' },
    { id: 'academico', name: 'Desenvolvimento acadêmico', short: 'Desenvolvimento acadêmico', description: 'Organização dos estudos, participação e aplicação do conteúdo acadêmico.', strength: 'Você parece ter recursos para avançar nos estudos e aproveitar oportunidades de aprendizagem.', focus: 'Sua rotina acadêmica pode se beneficiar de mais estrutura e revisão frequente.', action: 'Distribua o estudo ao longo da semana', detail: 'Separe blocos curtos de estudo em dias diferentes e revise o conteúdo antes de acumular matéria.', cadence: 'PLANEJAMENTO SEMANAL' },
    { id: 'relacionamentos', name: 'Relacionamentos', short: 'Relacionamentos', description: 'Comunicação, escuta, empatia e respeito aos limites pessoais e alheios.', strength: 'Suas respostas sugerem cuidado com a comunicação e com as perspectivas de outras pessoas.', focus: 'Comunicação, escuta ou estabelecimento de limites podem ser pontos para observar com atenção.', action: 'Pratique escuta sem interromper', detail: 'Em uma conversa importante, procure entender a perspectiva da outra pessoa antes de preparar sua resposta.', cadence: 'PRÓXIMA CONVERSA' },
    { id: 'pessoal', name: 'Desenvolvimento pessoal', short: 'Desenvolvimento pessoal', description: 'Hábitos, autonomia, objetivos e disposição para rever escolhas.', strength: 'Você demonstra intenção de crescer e assumir responsabilidade pelo próprio caminho.', focus: 'Definição de objetivos e revisão de hábitos podem ajudar a transformar intenção em mudança concreta.', action: 'Defina um próximo passo observável', detail: 'Escolha um objetivo que importa para você e escreva uma ação pequena, com prazo e um sinal claro de conclusão.', cadence: 'AÇÃO · PRÓXIMAS 48 H' }
  ];

  // 6 perguntas por categoria = 48 perguntas. Pontuações individualizadas para evitar
  // que a ordem da alternativa, sozinha, determine o resultado.
  const QUESTION_BANK = [
    { id:'em1', c:'emocional', q:'Quando algo não sai como você esperava, como costuma reagir?', options:[['Fico preso à frustração e tenho dificuldade para seguir.',0],['Preciso de bastante tempo para me reorganizar.',1],['Procuro entender o que aconteceu e sigo em frente.',2],['Reconheço a frustração, aprendo com ela e ajusto meu plano.',3]] },
    { id:'em2', c:'emocional', q:'Como você percebe o que está sentindo?', options:[['Geralmente só percebo quando já estou reagindo.',0],['Às vezes reconheço, mas nem sempre entendo o motivo.',1],['Costumo identificar minhas emoções e alguns gatilhos.',2],['Consigo identificar emoções, gatilhos e necessidades com clareza.',3]] },
    { id:'em3', c:'emocional', q:'Quando recebe uma crítica, o que tende a fazer?', options:[['Levo como ataque e reajo defensivamente.',0],['Fico incomodado e demoro para considerar o conteúdo.',1],['Tento separar o tom da crítica do que posso aproveitar.',2],['Avalio com calma, peço exemplos e uso o que for útil.',3]] },
    { id:'em4', c:'emocional', q:'Em períodos de estresse, como você lida com suas emoções?', options:[['Elas costumam controlar minhas decisões e atitudes.',0],['Tenho dificuldade, mas às vezes consigo me regular.',1],['Uso algumas estratégias para recuperar o equilíbrio.',2],['Reconheço meus limites e uso estratégias saudáveis de forma consistente.',3]] },
    { id:'em5', c:'emocional', q:'Quando comete um erro, como costuma tratar a si mesmo?', options:[['Me culpo muito e isso dificulta corrigir o erro.',0],['Fico frustrado comigo, embora depois consiga continuar.',1],['Reconheço o erro e procuro corrigir o que for possível.',2],['Assumo a responsabilidade sem me reduzir ao erro e extraio aprendizado.',3]] },
    { id:'em6', c:'emocional', q:'Antes de responder em uma situação tensa, quanto espaço você consegue criar para pensar?', options:[['Quase nenhum; respondo no impulso.',0],['Às vezes paro, mas frequentemente reajo de imediato.',1],['Na maioria das vezes consigo fazer uma pausa.',2],['Consigo pausar, avaliar opções e escolher como responder.',3]] },

    { id:'di1', c:'disciplina', q:'Quando define uma meta, o que acontece depois do entusiasmo inicial?', options:[['Frequentemente abandono a meta.',0],['Sigo por um tempo, mas perco a regularidade.',1],['Mantenho um ritmo razoável, com algumas interrupções.',2],['Crio uma rotina e continuo mesmo quando a motivação cai.',3]] },
    { id:'di2', c:'disciplina', q:'Com que frequência você cumpre os compromissos que assume consigo?', options:[['Raramente; costumo deixar para depois.',0],['Cumpro alguns, mas falho com frequência.',1],['Geralmente cumpro, embora haja exceções.',2],['Trato meus compromissos pessoais com seriedade e consistência.',3]] },
    { id:'di3', c:'disciplina', q:'Quando uma tarefa fica difícil ou entediante, como você age?', options:[['Evito ou abandono a tarefa.',0],['Adio até sentir pressão para continuar.',1],['Faço pausas e tento retomar a tarefa.',2],['Divido a dificuldade em etapas e avanço mesmo sem vontade.',3]] },
    { id:'di4', c:'disciplina', q:'Como você lida com hábitos que sabe que gostaria de mudar?', options:[['Penso em mudar, mas quase nunca começo.',0],['Começo com intensidade e paro depois de pouco tempo.',1],['Faço tentativas e consigo manter algumas mudanças.',2],['Começo pequeno, acompanho e ajusto o hábito ao longo do tempo.',3]] },
    { id:'di5', c:'disciplina', q:'Quando ninguém está cobrando, como você conduz suas responsabilidades?', options:[['Tenho dificuldade para agir sem cobrança externa.',0],['Faço o necessário, mas costumo adiar.',1],['Consigo me organizar na maior parte das vezes.',2],['Assumo a iniciativa e acompanho minhas próprias entregas.',3]] },
    { id:'di6', c:'disciplina', q:'Se você perde um dia de uma rotina, o que costuma acontecer?', options:[['Desisto porque sinto que já estraguei o progresso.',0],['Demoro a voltar à rotina.',1],['Retomo depois de um intervalo.',2],['Retomo na próxima oportunidade sem transformar uma falha em abandono.',3]] },

    { id:'or1', c:'organizacao', q:'Como você decide o que precisa fazer primeiro?', options:[['Faço o que aparece ou o que parece mais fácil.',0],['Prioritizo quando a pressão aumenta.',1],['Considero prazos e importância na maioria das vezes.',2],['Defino prioridades conscientemente e reviso quando necessário.',3]] },
    { id:'or2', c:'organizacao', q:'Com que frequência você adia tarefas importantes mesmo tendo tempo para começar?', options:[['Quase sempre.',0],['Frequentemente.',1],['Às vezes.',2],['Raramente; começo com uma etapa pequena.',3]] },
    { id:'or3', c:'organizacao', q:'Como você acompanha prazos, compromissos e tarefas?', options:[['Confio na memória e frequentemente esqueço algo.',0],['Anoto algumas coisas, mas não mantenho um sistema.',1],['Uso agenda ou listas de forma relativamente regular.',2],['Mantenho um sistema simples e reviso minhas tarefas.',3]] },
    { id:'or4', c:'organizacao', q:'Quando sua rotina fica cheia, como você reage?', options:[['Me perco e deixo várias coisas sem encaminhamento.',0],['Tento resolver tudo ao mesmo tempo e fico sobrecarregado.',1],['Reorganizo parte das tarefas e peço prazo quando preciso.',2],['Reavalio prioridades, ajusto expectativas e organizo a execução.',3]] },
    { id:'or5', c:'organizacao', q:'Quanto você costuma estimar o tempo necessário para uma tarefa?', options:[['Quase nunca; normalmente calculo mal.',0],['Estimo por alto e frequentemente atraso.',1],['Faço estimativas razoáveis para a maioria das tarefas.',2],['Considero etapas, imprevistos e reviso minhas estimativas.',3]] },
    { id:'or6', c:'organizacao', q:'Ao terminar o dia, você tem clareza do que avançou e do que ficou pendente?', options:[['Não costumo acompanhar isso.',0],['Tenho uma ideia geral, mas perco pendências.',1],['Geralmente sei o que concluí e o que falta.',2],['Reviso o progresso e defino o próximo passo.',3]] },

    { id:'ap1', c:'aprendizado', q:'Quando encontra um assunto que não conhece, qual é sua reação?', options:[['Evito porque parece difícil ou pouco familiar.',0],['Procuro uma explicação apenas se for necessário.',1],['Busco entender o básico quando tenho oportunidade.',2],['Investigo, faço perguntas e procuro fontes para aprender.',3]] },
    { id:'ap2', c:'aprendizado', q:'Depois de aprender algo novo, o que você costuma fazer?', options:[['Geralmente não reviso nem aplico o conteúdo.',0],['Releio ou assisto novamente quando lembro.',1],['Pratico algumas vezes para consolidar o aprendizado.',2],['Aplico, explico com minhas palavras e identifico lacunas.',3]] },
    { id:'ap3', c:'aprendizado', q:'Como você reage quando percebe que não entendeu algo?', options:[['Sigo adiante sem tentar esclarecer.',0],['Fico frustrado e tento poucas vezes.',1],['Procuro outra explicação ou peço ajuda.',2],['Experimento abordagens diferentes até compreender melhor.',3]] },
    { id:'ap4', c:'aprendizado', q:'Com que frequência você reserva tempo para aprender por iniciativa própria?', options:[['Quase nunca.',0],['De forma irregular, quando sobra tempo.',1],['Com alguma regularidade.',2],['Tenho uma rotina realista e consistente de aprendizado.',3]] },
    { id:'ap5', c:'aprendizado', q:'Quando recebe informações que contradizem sua opinião, como reage?', options:[['Rejeito sem considerar muito.',0],['Tenho resistência, mas às vezes escuto.',1],['Considero os argumentos e comparo com o que sei.',2],['Investigo evidências e reviso minha posição se necessário.',3]] },
    { id:'ap6', c:'aprendizado', q:'Como você percebe se realmente aprendeu alguma coisa?', options:[['Pelo tempo que passei estudando ou lendo.',0],['Pela sensação de que o conteúdo parece familiar.',1],['Por conseguir responder perguntas ou resolver alguns exercícios.',2],['Por conseguir explicar e aplicar o conhecimento em situações novas.',3]] },

    { id:'pr1', c:'profissional', q:'Quando recebe uma tarefa no trabalho ou em um projeto, como conduz a entrega?', options:[['Espero instruções constantes para avançar.',0],['Faço a tarefa, mas posso perder prazos ou detalhes.',1],['Entendo o pedido e entrego corretamente na maioria das vezes.',2],['Confirmo expectativas, acompanho o progresso e comunico riscos cedo.',3]] },
    { id:'pr2', c:'profissional', q:'Como você reage quando não sabe resolver um problema profissional?', options:[['Evito o problema ou espero que alguém resolva.',0],['Tento sozinho sem um plano e desisto se não funciona.',1],['Pesquiso ou peço orientação quando necessário.',2],['Investigo, testo soluções e sei quando pedir ajuda.',3]] },
    { id:'pr3', c:'profissional', q:'Como você recebe feedback sobre seu trabalho?', options:[['Evito ou ignoro o feedback.',0],['Escuto, mas tenho dificuldade em transformar em ação.',1],['Considero os pontos e tento corrigir o que for válido.',2],['Peço exemplos, combino próximos passos e acompanho a melhoria.',3]] },
    { id:'pr4', c:'profissional', q:'Como você se comunica quando uma entrega pode atrasar?', options:[['Aviso só depois de passar do prazo, se avisar.',0],['Aviso quando o atraso já parece inevitável.',1],['Procuro avisar assim que percebo o risco.',2],['Comunico cedo, explico o impacto e proponho alternativas.',3]] },
    { id:'pr5', c:'profissional', q:'Quanto você investe em desenvolver competências relevantes para seus objetivos profissionais?', options:[['Não tenho investido nisso.',0],['Aprendo ocasionalmente, sem um foco claro.',1],['Tenho objetivos e estudo algumas competências.',2],['Pratico de forma planejada e reviso meu progresso.',3]] },
    { id:'pr6', c:'profissional', q:'Quando identifica uma oportunidade de melhorar um processo, o que faz?', options:[['Não costumo agir ou compartilhar a ideia.',0],['Comento informalmente, mas raramente avanço.',1],['Sugiro uma melhoria quando vejo uma oportunidade.',2],['Avalio o problema, proponho uma solução viável e acompanho o resultado.',3]] },

    { id:'ac1', c:'academico', q:'Como você organiza os estudos fora das aulas?', options:[['Estudo principalmente na véspera de provas.',0],['Estudo quando sobra tempo ou acumula matéria.',1],['Tenho alguns horários de estudo durante a semana.',2],['Distribuo o estudo de acordo com as disciplinas e prazos.',3]] },
    { id:'ac2', c:'academico', q:'Quando falta a uma aula ou perde uma explicação, o que faz?', options:[['Deixo o conteúdo de lado.',0],['Tento recuperar apenas se for cobrado.',1],['Procuro o material e recupero parte do conteúdo.',2],['Busco o conteúdo perdido e verifico se realmente compreendi.',3]] },
    { id:'ac3', c:'academico', q:'Como você se prepara para avaliações e entregas?', options:[['Começo muito perto do prazo.',0],['Planejo pouco e dependo de esforço de última hora.',1],['Começo com antecedência em boa parte das vezes.',2],['Divido o trabalho em etapas e reservo tempo para revisar.',3]] },
    { id:'ac4', c:'academico', q:'Quando um conteúdo parece difícil, como você costuma estudar?', options:[['Evito ou decoro sem entender.',0],['Leio novamente, mas não mudo muito a estratégia.',1],['Procuro exemplos e pratico exercícios.',2],['Combino explicações, prática e revisão para identificar as lacunas.',3]] },
    { id:'ac5', c:'academico', q:'Como você participa do próprio processo de aprendizagem?', options:[['Espero que as aulas sejam suficientes.',0],['Participo quando sou solicitado.',1],['Faço perguntas e procuro materiais complementares às vezes.',2],['Busco esclarecer dúvidas e relacionar teoria com prática.',3]] },
    { id:'ac6', c:'academico', q:'Como você equilibra estudos com outras responsabilidades?', options:[['Não tenho um equilíbrio previsível e frequentemente deixo tarefas acumular.',0],['Tento conciliar, mas a rotina costuma me desorganizar.',1],['Consigo equilibrar a maior parte das responsabilidades.',2],['Planejo uma rotina realista e ajusto quando surgem imprevistos.',3]] },

    { id:'re1', c:'relacionamentos', q:'Quando alguém fala sobre um problema, como você costuma escutar?', options:[['Interrompo ou tento resolver sem entender completamente.',0],['Escuto, mas minha atenção se dispersa.',1],['Procuro ouvir e fazer perguntas para entender.',2],['Escuto com atenção, confirmo o que entendi e evito presumir.',3]] },
    { id:'re2', c:'relacionamentos', q:'Como você expressa discordância?', options:[['Ataco, ironizo ou evito completamente a conversa.',0],['Tenho dificuldade para falar sem ficar na defensiva.',1],['Expresso minha opinião tentando manter o respeito.',2],['Explico meu ponto com clareza e considero a perspectiva da outra pessoa.',3]] },
    { id:'re3', c:'relacionamentos', q:'Como você lida com limites pessoais, seus e dos outros?', options:[['Tenho dificuldade para respeitar ou comunicar limites.',0],['Reconheço alguns limites, mas nem sempre ajo de acordo.',1],['Geralmente comunico e respeito limites.',2],['Consigo estabelecer limites claros e respeitar os dos outros.',3]] },
    { id:'re4', c:'relacionamentos', q:'Quando percebe que magoou alguém, como costuma agir?', options:[['Minimizo o ocorrido ou culpo a outra pessoa.',0],['Tenho dificuldade para conversar sobre isso.',1],['Tento entender o impacto e pedir desculpas quando necessário.',2],['Escuto o impacto, assumo minha parte e busco reparar o que for possível.',3]] },
    { id:'re5', c:'relacionamentos', q:'Como você demonstra interesse pelas pessoas importantes para você?', options:[['Raramente dedico tempo ou atenção.',0],['Demonstro interesse, mas de forma irregular.',1],['Procuro estar presente e manter contato.',2],['Faço espaço de forma consistente e demonstro atenção de maneira significativa.',3]] },
    { id:'re6', c:'relacionamentos', q:'Quando há um conflito, qual é sua tendência?', options:[['Evito, explodo ou tento vencer a discussão a qualquer custo.',0],['Fico preso à minha posição e demoro para dialogar.',1],['Tento conversar e encontrar um entendimento.',2],['Busco entender necessidades, expressar as minhas e negociar soluções justas.',3]] },

    { id:'pe1', c:'pessoal', q:'Quão claros são seus objetivos para os próximos meses?', options:[['Não tenho objetivos definidos no momento.',0],['Tenho ideias, mas não sei bem como avançar.',1],['Tenho alguns objetivos e próximos passos.',2],['Tenho prioridades claras e reviso os passos de forma realista.',3]] },
    { id:'pe2', c:'pessoal', q:'Como você cuida de hábitos básicos que sustentam seu bem-estar?', options:[['Deixo esses cuidados de lado com frequência.',0],['Cuido quando lembro ou quando a rotina permite.',1],['Mantenho alguns hábitos de forma regular.',2],['Procuro manter hábitos sustentáveis e ajustá-los às minhas necessidades.',3]] },
    { id:'pe3', c:'pessoal', q:'Quando percebe que uma escolha não está funcionando, o que faz?', options:[['Continuo no mesmo padrão mesmo percebendo o impacto.',0],['Penso em mudar, mas adio a decisão.',1],['Faço ajustes quando consigo identificar uma alternativa.',2],['Reavalio com honestidade, testo uma mudança e observo o resultado.',3]] },
    { id:'pe4', c:'pessoal', q:'Quanto suas ações do dia a dia combinam com o que você diz ser importante?', options:[['Existe uma diferença grande entre intenção e prática.',0],['Consigo alinhar algumas áreas, mas não de forma constante.',1],['Na maioria das vezes ajo de acordo com minhas prioridades.',2],['Reviso minhas escolhas e procuro alinhar ações e valores.',3]] },
    { id:'pe5', c:'pessoal', q:'Como você reage ao comparar seu progresso com o de outras pessoas?', options:[['A comparação costuma me paralisar ou desvalorizar.',0],['Fico desmotivado, mesmo sabendo que cada pessoa tem seu tempo.',1],['Às vezes comparo, mas consigo voltar aos meus objetivos.',2],['Uso referências com critério e avalio meu progresso pelos meus próprios objetivos.',3]] },
    { id:'pe6', c:'pessoal', q:'Quando pensa em melhorar sua vida, como transforma isso em ação?', options:[['Fico no desejo ou na ideia sem começar.',0],['Começo várias coisas sem conseguir priorizar.',1],['Escolho uma mudança e avanço em alguns momentos.',2],['Defino uma ação pequena, um prazo e uma forma de acompanhar.',3]] }
  ];

  const state = { answers: {}, questions: [], current: 0, lastResult: null };
  const $ = id => document.getElementById(id);
  const views = ['home-view', 'quiz-view', 'results-view', 'history-view'];
  const esc = value => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const categoryFor = id => CATEGORIES.find(c => c.id === id);
  const shuffle = arr => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  function showView(id) {
    views.forEach(viewId => $(viewId).classList.toggle('active', viewId === id));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    $('app').focus({ preventScroll: true });
  }
  function getHistory() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(data) ? data : [];
    } catch (e) {
      return [];
    }
  }
  function setHistory(items) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      return true;
    } catch (e) {
      showToast('Não foi possível salvar. Verifique o armazenamento do navegador.');
      return false;
    }
  }
  function showToast(message) {
    const toast = $('toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('show'), 2800);
  }
  function startEvaluation() {
    state.answers = {};
    state.questions = [...QUESTION_BANK]; // mesma seleção e sequência para comparação justa
    state.current = 0;
    state.lastResult = null;
    renderQuestion();
    showView('quiz-view');
  }
  function renderQuestion() {
    const q = state.questions[state.current];
    if (!q) return;
    const category = categoryFor(q.c);
    const indexInCategory = state.questions.slice(0, state.current + 1).filter(item => item.c === q.c).length;
    const categoryTotal = state.questions.filter(item => item.c === q.c).length;
    $('quiz-counter').innerHTML = `${String(state.current + 1).padStart(2,'0')} <span>/ ${state.questions.length}</span>`;
    $('progress-fill').style.width = `${((state.current + 1) / state.questions.length) * 100}%`;
    $('category-tag').textContent = category.name.toLocaleUpperCase('pt-BR');
    $('question-step').textContent = `PERGUNTA ${String(indexInCategory).padStart(2,'0')} / ${String(categoryTotal).padStart(2,'0')}`;
    $('question-title').textContent = q.q;
    $('question-hint').textContent = 'Pense no seu comportamento mais comum nas últimas semanas, não apenas no seu melhor ou pior dia.';
    $('options-list').innerHTML = '';
    q.options.forEach((option, i) => {
      const selected = state.answers[q.id] === i;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `option-card${selected ? ' selected' : ''}`;
      button.setAttribute('aria-pressed', String(selected));
      button.innerHTML = `<span class="option-letter">${String.fromCharCode(65+i)}</span><span class="option-text">${esc(option[0])}</span><span class="option-check" aria-hidden="true">✓</span>`;
      button.addEventListener('click', () => {
        state.answers[q.id] = i;
        renderQuestion();
      });
      $('options-list').appendChild(button);
    });
    $('previous-button').disabled = state.current === 0;
    $('next-button').disabled = state.answers[q.id] === undefined;
    $('next-button').innerHTML = state.current === state.questions.length - 1 ? 'Ver resultado <span aria-hidden="true">↗</span>' : 'Próxima <span aria-hidden="true">→</span>';
  }
  function moveNext() {
    const q = state.questions[state.current];
    if (state.answers[q.id] === undefined) return;
    if (state.current < state.questions.length - 1) {
      state.current++;
      renderQuestion();
    } else {
      const unanswered = state.questions.findIndex(item => state.answers[item.id] === undefined);
      if (unanswered !== -1) {
        state.current = unanswered;
        renderQuestion();
        showToast('Responda às perguntas restantes para ver seu resultado.');
        return;
      }
      state.lastResult = calculateResult();
      renderResults(state.lastResult);
      showView('results-view');
    }
  }
  function movePrevious() {
    if (state.current > 0) {
      state.current--;
      renderQuestion();
    } else {
      showView('home-view');
    }
  }
  function calculateResult() {
    const categoryResults = CATEGORIES.map(category => {
      const questions = QUESTION_BANK.filter(q => q.c === category.id);
      const total = questions.reduce((sum, q) => sum + q.options[state.answers[q.id]][1], 0);
      const max = questions.reduce((sum, q) => sum + Math.max(...q.options.map(o => o[1])), 0);
      return { id: category.id, name: category.name, score: max ? Math.round(total / max * 100) : 0, answered: questions.length };
    });
    const overall = Math.round(categoryResults.reduce((sum, item) => sum + item.score, 0) / categoryResults.length);
    let label, summary;
    if (overall < 40) {
      label = 'Pontos que pedem atenção';
      summary = 'Suas respostas sugerem que algumas áreas podem estar exigindo mais energia neste momento. Comece com uma mudança pequena e realista, sem tentar resolver tudo ao mesmo tempo.';
    } else if (overall < 60) {
      label = 'Em desenvolvimento';
      summary = 'Há recursos que você já utiliza e outras áreas que podem ganhar estrutura. Escolha um ponto prioritário e transforme a intenção em uma ação observável.';
    } else if (overall < 75) {
      label = 'Base em construção';
      summary = 'Suas respostas indicam uma base razoável em diferentes áreas, com oportunidades de tornar algumas atitudes mais consistentes.';
    } else if (overall < 90) {
      label = 'Bom equilíbrio percebido';
      summary = 'Você relata práticas positivas em boa parte das áreas avaliadas. O próximo passo é preservar o que funciona e escolher ajustes específicos.';
    } else {
      label = 'Resultados percebidos muito positivos';
      summary = 'Suas respostas indicam uma percepção bastante positiva das áreas avaliadas. Use o resultado para reconhecer seus recursos e continuar atento aos pontos que merecem cuidado.';
    }
    return {
      id: makeId(), date: new Date().toISOString(), overall, label, summary,
      categories: categoryResults,
      answers: { ...state.answers },
      questionCount: QUESTION_BANK.length
    };
  }
  function makeId() {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;
  }
  function renderResults(result) {
    $('overall-score').textContent = result.overall;
    $('overall-meter').style.width = `${result.overall}%`;
    $('overall-label').textContent = result.label;
    $('overall-summary').textContent = result.summary;
    const sorted = [...result.categories].sort((a,b) => b.score - a.score);
    $('category-bars').innerHTML = sorted.map(item => `
      <div class="bar-row">
        <span class="bar-name">${esc(item.name)}</span>
        <div class="bar-track" aria-label="${esc(item.name)}: ${item.score} de 100"><div class="bar-fill" style="width:${item.score}%"></div></div>
        <span class="bar-score">${item.score}</span>
      </div>`).join('');
    const strongest = sorted.slice(0, 2);
    const focus = [...sorted].reverse().slice(0, 2);
    $('strengths-list').innerHTML = strongest.map(item => {
      const cat = categoryFor(item.id);
      return `<div class="insight-item"><h3>${esc(cat.name)} · ${item.score}/100</h3><p>${esc(item.score >= 75 ? cat.strength : 'Esta foi uma das áreas com pontuação relativamente mais alta no seu resultado. Observe quais comportamentos contribuem para isso e como preservá-los.')}</p></div>`;
    }).join('');
    $('focus-list').innerHTML = focus.map(item => {
      const cat = categoryFor(item.id);
      return `<div class="insight-item"><h3>${esc(cat.name)} · ${item.score}/100</h3><p>${esc(item.score < 75 ? cat.focus : 'Mesmo com uma pontuação relativamente alta, esta área pode trazer oportunidades de ajuste. Pense em um comportamento específico que gostaria de fortalecer.')}</p></div>`;
    }).join('');
    $('action-list').innerHTML = focus.map((item, index) => {
      const cat = categoryFor(item.id);
      return `<article class="action-card"><span class="action-number">${String(index+1).padStart(2,'0')}</span><div><h3>${esc(cat.action)}</h3><p>${esc(cat.detail)}</p><span class="action-meta">${esc(cat.cadence)}</span></div></article>`;
    }).join('');
  }
  function saveCurrentResult() {
    if (!state.lastResult) return false;
    const history = getHistory();
    history.unshift(state.lastResult);
    const ok = setHistory(history.slice(0, 100));
    if (ok) showToast('Avaliação salva no histórico deste navegador.');
    return ok;
  }
  function formatDate(iso) {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return 'Data indisponível';
    return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
  }
  function renderHistory() {
    const history = getHistory().sort((a,b) => new Date(b.date) - new Date(a.date));
    if (!history.length) {
      $('history-summary').innerHTML = '';
      $('history-list').innerHTML = `<div class="history-empty"><h2>Seu primeiro registro começa aqui.</h2><p>Depois de concluir uma avaliação, salve o resultado para acompanhar sua percepção ao longo do tempo.</p></div>`;
      $('clear-history').disabled = true;
      return;
    }
    const avg = Math.round(history.reduce((sum, item) => sum + item.overall, 0) / history.length);
    const diff = history.length > 1 ? history[0].overall - history[1].overall : null;
    const diffText = diff === null ? 'Ainda sem comparação' : `${diff > 0 ? '+' : ''}${diff} pontos vs. anterior`;
    $('history-summary').innerHTML = `
      <div class="history-stat"><span>Avaliações salvas</span><strong>${history.length}</strong><small>neste navegador</small></div>
      <div class="history-stat"><span>Média geral</span><strong>${avg}<small>/100</small></strong><small>entre seus registros</small></div>
      <div class="history-stat"><span>Última variação</span><strong>${diff === null ? '—' : `${diff > 0 ? '+' : ''}${diff}`}</strong><small>${esc(diffText)}</small></div>`;
    $('history-list').innerHTML = history.map(item => `
      <article class="history-entry">
        <div><p class="history-date">${esc(formatDate(item.date))}</p><p class="history-sub">${esc(item.label || 'Avaliação pessoal')} · ${item.questionCount || 48} perguntas</p></div>
        <div class="history-score">${Number(item.overall) || 0}<small>/100</small></div>
        <div class="history-entry-actions"><button class="small-button view-entry" type="button" data-id="${esc(item.id)}">Ver resultado</button><button class="small-button delete delete-entry" type="button" data-id="${esc(item.id)}" aria-label="Excluir avaliação de ${esc(formatDate(item.date))}">Excluir</button></div>
      </article>`).join('');
    $('clear-history').disabled = false;
    $('history-list').querySelectorAll('.view-entry').forEach(button => button.addEventListener('click', () => {
      const item = getHistory().find(entry => entry.id === button.dataset.id);
      if (!item) return;
      renderResults(item);
      state.lastResult = item;
      showView('results-view');
    }));
    $('history-list').querySelectorAll('.delete-entry').forEach(button => button.addEventListener('click', () => {
      if (!window.confirm('Excluir somente esta avaliação do histórico?')) return;
      setHistory(getHistory().filter(entry => entry.id !== button.dataset.id));
      renderHistory();
      showToast('Avaliação excluída.');
    }));
  }
  function goHome() { showView('home-view'); }
  function goHistory() { renderHistory(); showView('history-view'); }

  $('year').textContent = new Date().getFullYear();
  $('start-button').addEventListener('click', startEvaluation);
  $('brand-home').addEventListener('click', event => { event.preventDefault(); goHome(); });
  $('history-shortcut').addEventListener('click', goHistory);
  $('exit-quiz').addEventListener('click', () => {
    if (Object.keys(state.answers).length && !window.confirm('Sair agora? As respostas desta avaliação não serão salvas no histórico.')) return;
    goHome();
  });
  $('next-button').addEventListener('click', moveNext);
  $('previous-button').addEventListener('click', movePrevious);
  $('print-results').addEventListener('click', () => window.print());
  $('save-new-evaluation').addEventListener('click', () => {
    if (saveCurrentResult()) startEvaluation();
  });
  $('history-button').addEventListener('click', goHistory);
  $('retake-button').addEventListener('click', () => {
    if (window.confirm('Começar novamente? As respostas atuais serão descartadas, mas avaliações salvas continuarão no histórico.')) startEvaluation();
  });
  $('back-home').addEventListener('click', goHome);
  $('history-new-evaluation').addEventListener('click', startEvaluation);
  $('clear-history').addEventListener('click', () => {
    if (!getHistory().length) return;
    if (!window.confirm('Apagar todas as avaliações salvas neste navegador? Esta ação não pode ser desfeita.')) return;
    setHistory([]);
    renderHistory();
    showToast('Histórico apagado.');
  });

  // Se o usuário recarregar durante o questionário, não há rascunho persistente.
  // Isso evita gravar respostas parciais ou dados não finalizados como uma avaliação.
})();
